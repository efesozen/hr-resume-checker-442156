import { api } from '@/lib/api';
import type { ResumeResponseDto, CreateResumeDto, UpdateResumeDto } from '@saas-template/core';

export const resumesService = {
  async getAll(): Promise<ResumeResponseDto[]> {
    const response = await api.get('/resumes');
    return response.data;
  },

  async getById(id: string): Promise<ResumeResponseDto> {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  async create(data: CreateResumeDto): Promise<ResumeResponseDto> {
    const response = await api.post('/resumes', data);
    return response.data;
  },

  async update(id: string, data: UpdateResumeDto): Promise<ResumeResponseDto> {
    const response = await api.put(`/resumes/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/resumes/${id}`);
  },
};
