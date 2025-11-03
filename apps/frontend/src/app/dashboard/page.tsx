'use client';

import { useResumes } from '@/features/resumes/hooks/use-resumes';

export default function UserDashboardPage() {
  const { data: resumes, isLoading } = useResumes();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <p className="text-muted-foreground mb-6">Main interface for users to upload resumes and view analysis.</p>
      
      <div className="grid gap-4">
        {resumes?.map((resume: any) => (
          <div key={resume.id} className="border rounded p-4">
            <pre>{JSON.stringify(resume, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
