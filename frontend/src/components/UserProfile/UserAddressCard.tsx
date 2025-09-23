import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { getEmployeeProfiles, createEmployeeProfiles, editEmployeeProfiles } from "../../api/employeeProfileApi";
import { EmployeeProfile } from "../../types/employee";
import { useEffect, useState } from "react";
import Select from "../form/Select";


const employmentOptions = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];



export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [profiles, setProfiles] = useState<EmployeeProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<String | null>(null)

  const [department, setDepartment] = useState('')
  const [reportingManager, setReportingManager] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [workLocation, setWorkLocation] = useState('')
  const [workSchedule, setWorkSchedule] = useState('')
 
  useEffect(() => {
    const fetchProfiles = async () =>{
      try {
        const data = await getEmployeeProfiles()
        console.log(data)
        setProfiles(data)

        setDepartment(data.department || '')
        setEmploymentType(data.employmentType || '')
        setReportingManager(data.reportingManager || '')
        setStartDate(data.startDate || '')
        setWorkLocation(data.workLocation || '')
        setWorkSchedule(data.workSchedule || '')
      } catch (error: any) {
        setError(error.response?.data?.message || 'No Profile found please create one')
      } finally {
        setLoading(false)
      }
    }
    fetchProfiles()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(null)
      const payload = {
        department,
        reportingManager,
        employmentType,
        startDate,
        workLocation,
        workSchedule,
      }
      let updated: EmployeeProfile
      if(profiles) {
        //already have profile -> update
        updated = await editEmployeeProfiles(payload)
      } else {
        //no profil -> create
        updated = await createEmployeeProfiles(payload as any)
      }

      setProfiles(updated)
      alert('Profile save!')
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error saving profile')
    }

    console.log("Saving changes...");
    closeModal();
  };

  if(loading) return <p>Loading....</p>
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Employment Details 
            </h4>
            <p className="text-red-500">{error}</p>
            {profiles && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Job Title
                </p>
                <p className={!profiles.jobTitle ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.jobTitle || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Department
                </p>
                <p className={!profiles.department ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.department || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Reporting Manager
                </p>
                <p className={!profiles.reportingManager ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.reportingManager || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Employment Type
                </p>
                <p className={!profiles.employmentType ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.employmentType || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Start Date
                </p>
                <p className={!profiles.startDate ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.startDate || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Status
                </p>
                <p className={!profiles.status ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.status || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Work Location
                </p>
                <p className={!profiles.workLocation ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.workLocation || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Work Schedule
                </p>
                <p className={!profiles.workSchedule ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.workSchedule || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  leave Balance
                </p>
                <p className={!profiles.leaveBalance ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.leaveBalance || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Over Time Records
                </p>
                <p className={!profiles.overTimeRecords ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.overTimeRecords || 'N/A'}
                </p>
              </div>
            </div>
            )}
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {profiles ? 'Edit Employment Details' : 'Create Employment Details'}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {profiles ? 'Update your details to keep your profile up-to-date.' : 'Fill out your information to create your profile.'}
            </p>
          </div>
          <form onSubmit={handleSave} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Department</Label>
                  <Input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>

                <div>
                  <Label>Reporting Manager</Label>
                  <Input type="text" placeholder="Reporting Manager" value={reportingManager} onChange={(e) => setReportingManager(e.target.value)} />
                </div>

                <div>
                  <Label>Employment Type</Label>
                  <Select
                    options={employmentOptions}
                    placeholder="Select employment type"
                    defaultValue={employmentType}            
                    onChange={(value) => setEmploymentType(value)} 
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Start Date</Label>
                  <Input type="date" placeholder="dd/mm/yyyy" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div>
                  <Label>Work Location</Label>
                  <Input type="text" placeholder="Work Location" value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} />
                </div>

                <div>
                  <Label>Work Schedule</Label>
                  <Input type="text" placeholder="Work Schedule" value={workSchedule} onChange={(e) => setWorkSchedule(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                {profiles ? 'Update Employment Details' : 'Create Employment Details'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
