import type { CreateResumeDto, UpdateResumeDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resumesService } from '../services';

const RESUME_KEY = ['resumes'];

export function useResumes() {
  return useQuery({
    queryKey: RESUME_KEY,
    queryFn: () => resumesService.getAll(),
  });
}

export function useResume(id: string) {
  return useQuery({
    queryKey: [...RESUME_KEY, id],
    queryFn: () => resumesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResumeDto) => resumesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEY });
    },
  });
}

export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateResumeDto }) =>
      resumesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEY });
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resumesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEY });
    },
  });
}
