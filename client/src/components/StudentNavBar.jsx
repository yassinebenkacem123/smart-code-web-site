import { NavLink } from "react-router-dom"
import { MdOutlineMessage } from "react-icons/md";

const StudentNavBar = ({setOpenStudentForm, openStudentForm}) => {
    const studentRoutes = [
        {
            title:<MdOutlineMessage 
            className=""
            size={22}/>,
            path:null,
            style:' p-1  hover:text-sky-400 duration-150 ease-in rounded-2xl'
        },
        {
            title:'Your Cours',
            path:'/etudiant-dashboard/cours',
            style:'hover:text-sky-300 duration-150 '
        },
        {
            title:'Profile',
            path:'/etudiant-dashboard/profile',
            style:'hover:text-sky-300 duration-150 ',
        },
     
    ]
    return (
    <nav className="flex gap-26 items-center ">
        {
        studentRoutes.map((route, index)=>{
           if(route.path === null){
            return <button
            onClick={()=>{
                if(openStudentForm){
                    setOpenStudentForm(false);}
                    else{
                        setOpenStudentForm(true)
                    }
            }}
            className={`${route.style} cursor-pointer font-medium`}
            >{route.title}</button>
           }
            return (
                <NavLink
                    key={index}
                    to={route.path}
                    className={`${route.style} font-medium`}
                >
                    {route.title}
                </NavLink>
            )
        
        })
    }
    </nav>
  )
}

export default StudentNavBar