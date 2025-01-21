import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    workload: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/cursos/${id}`);
        const { title, description, workload } = response.data;
        setFormData({ title, description, workload: String(workload) });
      } catch (error) {
        console.error("Erro ao carregar curso", error);
        alert("Erro ao carregar curso." + error);
        navigate("/");
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/cursos/${id}`, {
        title: formData.title,
        description: formData.description,
        workload: Number(formData.workload),
      });
      alert("Curso atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar curso", error);
      alert("Erro ao atualizar curso.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Editar Curso
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Título do Curso"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Descrição do Curso"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="workload"
              className="block text-sm font-medium text-gray-700"
            >
              Carga Horária (em horas)
            </label>
            <input
              type="number"
              id="workload"
              name="workload"
              placeholder="Carga Horária do Curso"
              value={formData.workload}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Atualizar Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
