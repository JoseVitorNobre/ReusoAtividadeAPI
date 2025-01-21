import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  workload: number;
}

const ListCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/cursos");
        setCourses(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchById = async () => {
    if (!searchId) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      const response = await api.get(`/cursos/${searchId}`);
      setCourses([response.data]);
    } catch (error) {
      console.error("Erro ao buscar curso por ID", error);
      alert("Curso não encontrado.");
    }
  };

  const handleDelete = async (courseId: number) => {
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses(courses.filter((course) => course.id !== courseId));
      alert("Curso deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar curso", error);
      alert("Erro ao deletar curso.");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lista de Cursos</h1>
            <p className="text-gray-600 text-sm">Gerencie seus cursos</p>
          </div>
          <button
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            onClick={() => navigate("/add")}
          >
            Adicionar Curso
          </button>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="number"
            placeholder="Pesquisar curso pelo ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleSearchById}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
          >
            Pesquisar
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Título</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Descrição</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">
                Carga Horária
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-gray-800">{course.id}</td>
                  <td className="px-6 py-4 text-gray-800">{course.title}</td>
                  <td className="px-6 py-4 text-gray-800">{course.description}</td>
                  <td className="px-6 py-4 text-gray-800">{course.workload}h</td>
                  <td className="px-6 py-4">
                    <button
                      className="mr-4 text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => navigate(`/edit/${course.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-medium"
                      onClick={() => handleDelete(course.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Nenhum curso encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCourses;
