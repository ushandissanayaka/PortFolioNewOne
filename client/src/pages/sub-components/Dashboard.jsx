import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProjects } from '@/store/slices/projectSlice';
import { getAllSkills } from '@/store/slices/skillsSlice';
import { clearAllApplicationSliceErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetApplicationSlice } from '@/store/slices/softwareApplicationSlice';
import { getAllTimeline } from '@/store/slices/timelineSlice';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch projects, skills, software applications, and timeline when the component mounts
  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllTimeline());
  }, [dispatch]);

  // Access the user, projects, skills, software applications, and timeline state from Redux
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { softwareApplications, error, loading, message } = useSelector((state) => state.softwareApplication);
  const { timeline } = useSelector((state) => state.timeline);

  const [appId, setAppId] = useState("");

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, error, message]);

  // Ensure projects, skills, and software applications are arrays and get their lengths
  const projectCount = Array.isArray(projects) ? projects.length : 0;
  const skillCount = Array.isArray(skills) ? skills.length : 0;

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-5 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {/* User Information Card */}
              <Card className="sm:col-span-2">
                <CardHeader>
                  <CardDescription className='max-w-lg text-balance leading-relaxed'>
                    {user?.aboutMe || "No information available"}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user?.portfolioURL || '#'}>
                    <Button>Visit portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Projects Count Card */}
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">{projectCount}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={"/manage/projects"}>
                    <Button>Manage Projects</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Skills Count Card */}
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">{skillCount}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link to={"/manage/skills"}>
                    <Button>Manage Skills</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Projects Table */}
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Stack</TableHead>
                          <TableHead className="hidden md:table-cell">Deployed</TableHead>
                          <TableHead className="hidden md:table-cell">Update</TableHead>
                          <TableHead className="hidden md:table-cell">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project._id}>
                            <TableCell>{project.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{project.stack.join(', ')}</TableCell>
                            <TableCell className="hidden md:table-cell">{project.deployed ? 'Yes' : 'No'}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Link to={`/update/project/${project._id}`}>
                                <Button variant="outline">Update</Button>
                              </Link>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {project.deployed ? (
                                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline">Visit</Button>
                                </a>
                              ) : (
                                <Button variant="outline" disabled>Visit</Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Skills Section */}
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        const proficiency = Math.min(Math.max(Number(element.proficiency || 0), 0), 100);

                        return (
                          <Card key={element._id}>
                            <CardHeader>
                              <CardTitle>{element.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-500">Proficiency: {proficiency}%</span>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-black rounded-full"
                                    style={{ width: `${proficiency}%` }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              {/* Add any footer content here */}
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl overflow-y-hidden">
                        You have not added any skills.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Software Applications Table */}
            <Tabs>
              <TabsContent className='grid min-[1050px]:grid-cols-2 gap-4'>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications && softwareApplications.length > 0 ? (
                          softwareApplications.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell>{element.name}</TableCell>
                              <TableCell>
                                <img src={element.svg?.url} alt={element.name} className="w-7 h-7" />
                              </TableCell>
                              <TableCell>
                                {
                                  loading && appId === element._id ? (
                                    <SpecialLoadingButton content={"Deleting"} width={"w-fit"} />
                                  ) : (
                                    <Button onClick={() => handleDeleteSoftwareApp(element._id)}>Delete</Button>
                                  )
                                }
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">
                              No software applications found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Timeline Table */}
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timeline"}>
                      <Button>Manage Timeline</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => (
                            <TableRow key={element._id}>
                              <TableCell>{element.title}</TableCell>
                              <TableCell>{element.timeLine.from}</TableCell>
                              <TableCell>{element.timeLine.to ? `${element.timeLine.to}` : "present"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;