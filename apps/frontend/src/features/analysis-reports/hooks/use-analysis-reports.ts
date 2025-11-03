import type { CreateAnalysisreportDto, UpdateAnalysisreportDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { analysisreportsService } from '../services';

const ANALYSISREPORT_KEY = ['analysisreports'];

export function useAnalysisreports() {
  return useQuery({
    queryKey: ANALYSISREPORT_KEY,
    queryFn: () => analysisreportsService.getAll(),
  });
}

export function useAnalysisreport(id: string) {
  return useQuery({
    queryKey: [...ANALYSISREPORT_KEY, id],
    queryFn: () => analysisreportsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAnalysisreport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnalysisreportDto) => analysisreportsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANALYSISREPORT_KEY });
    },
  });
}

export function useUpdateAnalysisreport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnalysisreportDto }) =>
      analysisreportsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANALYSISREPORT_KEY });
    },
  });
}

export function useDeleteAnalysisreport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => analysisreportsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANALYSISREPORT_KEY });
    },
  });
}
