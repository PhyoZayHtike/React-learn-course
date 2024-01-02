import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection} from 'firebase/firestore'
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

interface CreateFormData {
   title : string;
   description : string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

   const schema = yup.object().shape({
      title: yup.string().required("You must add a title."),
      description : yup.string().required("You must add a description."),
   })

   const {register,handleSubmit, formState : {errors}} = useForm<CreateFormData>({
      resolver: yupResolver(schema)
   })

   const postsRef = collection(db, "posts")

   const onCreatePost = async(data: CreateFormData) => {
     await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
     })
     navigate('/')
   }
   return (
      <div style={{height:"75vh"}} className="container d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit(onCreatePost)} className="col-md-9 col-lg-6 col-12 p-3 p-md-5 border rounded-3 shadow-sm mx-auto">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" id="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register("title")} placeholder="Title..." />
          <p className="text-danger">{errors.title?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" className={`form-control ${errors.description ? 'is-invalid' : ''}`} {...register("description")} placeholder="Description..."></textarea>
          <p className="text-danger">{errors.description?.message}</p>
        </div>
        <div className="">
          <input type="submit" value="Create Post" className="btn btn-primary" />
        </div>
      </form>
    </div>
   )
}