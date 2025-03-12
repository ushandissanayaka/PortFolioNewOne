import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllProjectSliceErrors, deleteProject, getAllProjects, resetProjectState } from '@/store/slices/projectSlice';

const ManageProjects = () => {
  const { loading, projects, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  const handleViewProject = (id) => {
    navigate(`/view/project/${id}`);
  };

  const handleUpdateProject = (id) => {
    navigate(`/update/project/${id}`);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectState());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to="/">
                <Button>Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell>
                        <img
                          src={project.projectBanner.url}
                          alt={project.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.stack.join(', ')}</TableCell>
                      <TableCell>{project.deployed ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => handleViewProject(project._id)}
                          disabled={loading}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          className="mr-2"
                          onClick={() => handleUpdateProject(project._id)}
                          disabled={loading}
                        >
                          Update
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteProject(project._id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjects;