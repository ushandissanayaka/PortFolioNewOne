import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearAllSkillSliceErrors, deleteSkill, getAllSkills, resetSkillSlice, updateSkills } from '@/store/slices/skillsSlice';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageSkills = () => {
  const { loading, skills, error, message } = useSelector(state => state.skill);
  const dispatch = useDispatch();
  const [proficiencies, setProficiencies] = useState({});

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (skills && skills.length > 0) {
      const initialProficiencies = skills.reduce((acc, skill) => {
        acc[skill._id] = skill.proficiency;
        return acc;
      }, {});
      setProficiencies(initialProficiencies);
    }
  }, [skills]);

  const handleInputChange = (id, value) => {
    setProficiencies(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleUpdateSkill = (id) => {
    const proficiency = proficiencies[id];
    if (proficiency !== undefined) {
      dispatch(updateSkills(id, proficiency));
    }
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to={"/"}>
                <Button className="w-fit">Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills && skills.length > 0 ? (
                skills.map(element => {
                  return (
                    <Card key={element._id}>
                      <CardHeader className="text-3xl font-bold items-center justify-between flex-row">
                        {element.title}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Trash2 onClick={() => handleDeleteSkill(element._id)} className='h-5 w-5 hover:text-red-600' />
                            </TooltipTrigger>
                            <TooltipContent side="right" style={{ color: "red" }}>Delete</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardHeader>
                      <CardFooter>
                        <Label className="text-2xl mr-2">
                          Proficiency
                        </Label>
                        <Input
                          type="number"
                          value={proficiencies[element._id] || ''}
                          onChange={(e) => handleInputChange(element._id, e.target.value)}
                          onBlur={() => handleUpdateSkill(element._id)}
                        />
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardTitle className="text-3xl overflow-y-hidden">You have not added any skills</CardTitle>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;