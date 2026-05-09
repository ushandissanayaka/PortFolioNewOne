import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllMyWorksErrors, deleteMyWork, getAllMyWorks, resetMyWorksState } from '@/store/slices/myWorksSlice';
import { toast } from 'react-toastify';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ManageMyWorks = () => {
  const { loading, message, error, myWorks } = useSelector(state => state.myWorks);
  const dispatch = useDispatch();

  const [workId, setWorkId] = useState("");

  const handleDeleteWork = (id) => {
    setWorkId(id);
    dispatch(deleteMyWork(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMyWorksErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMyWorksState());
      dispatch(getAllMyWorks());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Works</CardTitle>
              <Link to={"/"}>
                <Button>Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myWorks && myWorks.length > 0 ? (
                    myWorks.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.timeLine.from}</TableCell>
                        <TableCell>{item.timeLine.to || "Present"}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteWork(item._id)}
                            disabled={loading && workId === item._id}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">You have not added any works.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageMyWorks;
