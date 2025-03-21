import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessageSlice } from '@/store/slices/messagesSlices';
import { toast } from 'react-toastify';


const Messages = () => {
  const navigateTo = useNavigate();
  const { loading, messages, error , message} = useSelector((state) => state.Messages); // Avoid destructuring unnecessary fields
  const [messageId, setMessageId] = useState('');

  const handleReturnToDashboard = () => {
    navigateTo('/');
  };


  const dispatch = useDispatch()
  const handleMessageDelete = (id)=>{
    setMessageId(id);
    dispatch(deleteMessage(id))
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error , message, loading]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Messages</CardTitle>
              
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {loading ? (
                <CardHeader>Loading messages...</CardHeader>
              ) : error ? (
                <CardHeader className="text-red-500">Error: {error}</CardHeader>
              ) : messages && messages.length > 0 ? (
                messages.map((element) => (
                  <Card key={element._id} className="grid gap-2">
                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Sender Name:</span>
                      {element.senderName}
                    </CardDescription>

                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Subject:</span>
                      {element.Subject}
                    </CardDescription>

                    <CardDescription className="text-slate-950">
                      <span className="font-bold mr-2">Message</span>
                      {element.message}
                    </CardDescription>


                    <CardFooter className="justify-end">
                      {
                        loading && (messageId === element._id) ? (
                          <SpecialLoadingButton width={"w-32"} content={"Deleting"}></SpecialLoadingButton>
                        ):(
                          <Button className="w-32" onClick={()=> handleMessageDelete(element._id)}>Delete</Button>
                        )
                      }

                    </CardFooter>


                  </Card>
                ))
              ) : (
                <CardHeader>No Messages Found</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
