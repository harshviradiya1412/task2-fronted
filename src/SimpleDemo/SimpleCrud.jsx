import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFormData,
  registerSimple,
  deleteStudent,
  updateStudent,
  setEditStudent,
} from "../SimpleSlice/SimpleSlice";

const SimpleCrud = () => {
  const studentData = useSelector((state) => state.simpleSlice.studentInfo);
  const editStudent = useSelector((state) => state.simpleSlice.editStudent);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    gender: "",
    hobbies: [],
    password: "",
  });

  useEffect(() => {
    dispatch(loadFormData());
  }, [dispatch]);

  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    } else {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        course: "",
        gender: "",
        hobbies: [],
        password: "",
      });
    }
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const newHobbies = checked
          ? [...prevData.hobbies, value]
          : prevData.hobbies.filter((hobby) => hobby !== value);

        return { ...prevData, hobbies: newHobbies };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStudent) {
      dispatch(updateStudent({ id: editStudent.id, updatedData: formData }));
      dispatch(setEditStudent(null));
    } else {
      dispatch(registerSimple(formData));
    }
    setFormData({
      name: "",
      email: "",
      mobile: "",
      course: "",
      gender: "",
      hobbies: [],
      password: "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (student) => {
    dispatch(setEditStudent(student));
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Simple Crud
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="course"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Course
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Choose a course</option>
                      <option value="mca">MCA</option>
                      <option value="mba">MBA</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        id="gender-male"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="gender-male"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="gender-female"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="gender-female"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="hobbies"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hobby
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        id="hobby-cricket"
                        type="checkbox"
                        name="hobbies"
                        value="cricket"
                        checked={formData.hobbies.includes("cricket")}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="hobby-cricket"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Cricket
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="hobby-music"
                        type="checkbox"
                        name="hobbies"
                        value="music"
                        checked={formData.hobbies.includes("music")}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="hobby-music"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Music
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        id="hobby-travelling"
                        type="checkbox"
                        name="hobbies"
                        value="travelling"
                        checked={formData.hobbies.includes("travelling")}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="hobby-travelling"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Travelling
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: "blue" }}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {editStudent ? "Update" : "Sign up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {studentData.length !== 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hobbies
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student) => (
                  <tr
                    key={student.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {student.name}
                    </td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.mobile}</td>
                    <td className="px-6 py-4">{student.course}</td>
                    <td className="px-6 py-4">{student.gender}</td>
                    <td className="px-6 py-4">{student.hobbies.join(", ")}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(student)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-xl text-center mb-10 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          No Record Found
        </h1>
      )}
    </>
  );
};

export default SimpleCrud;
