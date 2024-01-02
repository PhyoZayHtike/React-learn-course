import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as IPost } from "./main";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getlikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId , likeId: doc.id })));
  };
  useEffect(() => {
    getlikes();
  }, []);
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid ,likeId: newDoc.id}]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev?.filter((like) => like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  return (
    <div className="container mt-5">
      <div className="col-md-8 mx-auto">
        <div className="card shadow p-3 mb-5 bg-white rounded">
          <div className="card-body">
            <h1 className="card-title">{post.title}</h1>
            <p className="card-text">{post.description}</p>
            <p className="card-text text-muted">Author: {post.username}</p>
            <button
              onClick={hasUserLiked ? removeLike : addLike}
              className={`btn btn-${hasUserLiked ? 'danger' : 'primary'}`} disabled={!user}
            >
              {hasUserLiked ? <>&#128078; Unlike</> : <>&#128077; Like</>} 
            </button>
            {likes && <p className="card-text mt-2">Likes: {likes?.length}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
