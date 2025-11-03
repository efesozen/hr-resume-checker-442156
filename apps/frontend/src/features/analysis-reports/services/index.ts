import { api } from '@/lib/api';
import type { AnalysisreportResponseDto, CreateAnalysisreportDto, UpdateAnalysisreportDto } from '@saas-template/core';

export const analysisreportsService = {
  async getAll(): Promise<AnalysisreportResponseDto[]> {
    const response = await api.get('/analysisreports');
    return response.data;
  },

  async getById(id: string): Promise<AnalysisreportResponseDto> {
    const response = await api.get(`/analysisreports/${id}`);
    return response.data;
  },

  async create(data: CreateAnalysisreportDto): Promise<AnalysisreportResponseDto> {
    const response = await api.post('/analysisreports', data);
    return response.data;
  },

  async update(id: string, data: UpdateAnalysisreportDto): Promise<AnalysisreportResponseDto> {
    const response = await api.put(`/analysisreports/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/analysisreports/${id}`);
  },
};
