import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slices/userSlice'
import { toast } from 'react-toastify'

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const { loading, error, isUpdated, message } = useSelector((state) => state.user)

  const dispatch = useDispatch() // react redux
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if (isUpdated) {
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if (message) {
      toast.success(message)
    }
  }, [dispatch, error, isUpdated, message])

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-3">Update Your Dashboard Password</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-5">
              <Label>Current Password</Label>
              <Input
                type="text"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)} // Corrected `onChange`
              />
            </div>

            <div className="grid gap-5">
              <Label>New Password</Label>
              <Input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Corrected `onChange`
              />
            </div>

            <div className="grid gap-5">
              <Label>Confirm New Password</Label>
              <Input
                type="text"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)} // Corrected `onChange`
              />
            </div>

            <div className="grid gap-2">
              {!loading ? (
                <Button onClick={handleUpdatePassword} className="w-full">
                  Update Password
                </Button>
              ) : (
                <SpecialLoadingButton content="Updating" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword
