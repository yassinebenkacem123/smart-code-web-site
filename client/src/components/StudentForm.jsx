import React from 'react'
import useStudentStore from '../store/useStudentStore'
const StudentForm = ({ setOpenStudentForm }) => {
  const { courses,sendMessage,loading } = useStudentStore()
  const [formData, setFormData] = React.useState({
    course: '',
    message: '',
  })

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleOnSubmit =   async (e) => {
    e.preventDefault();
    const enseignant_id = courses.filter(course=>course.titre === formData.course)[0].enseignant_id;
   await sendMessage(enseignant_id, formData.message);
    setOpenStudentForm(false);
    setFormData({
      course: '',
      message: '',
    });
  }
  return (
    <form 
    onSubmit={handleOnSubmit}
    className="black text-white bg-gray-950/90 border-sky-400 border-1 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">
          Envoyer Votre Message
        </h1>
        <p className="p-2 rounded-lg bg-sky-300/20 mt-2 border-sky-400 border-1 text-gray-300">
          Vous pouvez poser toutes les questions liées au cours.
        </p>
      </div>

      <div>
        <label htmlFor="course" className="block mb-1 font-medium text-white">
          Choisir un cours
        </label>
        <select
          onChange={handleChange}
          name="course"
          id="course"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option className='bg-gray-900' value="">-- Sélectionner un cours --</option>
          {courses.map((course, index) => (
            <option className='bg-gray-900' key={index} value={course.titre}>
              {course.titre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium text-white">
          Message
        </label>
        <textarea
          onChange={handleChange}
          name="message"
          id="message"
          cols="30"
          rows="6"
          placeholder="Votre message..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
        ></textarea>
      </div>

      <div className="flex justify-end gap-4">
        <button
        type='submit'
          className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer px-5 py-2 rounded-md transition duration-200"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
        <button
          type="button"
          onClick={() => setOpenStudentForm(false)}
          className="bg-gray-800 text-white hover:bg-gray-600 cursor-pointer px-5 py-2 rounded-md transition duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}

export default StudentForm
