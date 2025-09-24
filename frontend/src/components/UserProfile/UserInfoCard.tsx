import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EmployeeProfile } from "../../types/employee";
import { getEmployeeProfiles, createEmployeeProfiles, editEmployeeProfiles } from "../../api/employeeProfileApi";
import { useEffect, useState } from "react";
import Select from "../form/Select";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [profiles, setProfiles] = useState<EmployeeProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [taxId, setTaxId] = useState('')

  const [contact, setContact] = useState<{phone: string; email: string; address: string}>({
    phone: '',
    email: '',
    address: '',
  })
  const [emergencyContacts, setEmergencyContacts] = useState<{name: string; relationship: string; phone: string}[]>([
    {
      name: '',
      relationship: '',
      phone: '',
    }
  ])

  useEffect(() => {
    const fetchProfiles = async () =>{
      try {
        const data = await getEmployeeProfiles()
        setProfiles(data)

        setDateOfBirth(data.dateOfBirth || '')
        setGender(data.gender || '')
        setNationalId(data.nationalId || '')
        setTaxId(data.taxId || '')
        setContact({
          phone: data.contact?.phone || '',
          email: data.contact?.email || '',
          address: data.contact?.address || '',
        })
        setEmergencyContacts(
          (data.emergencyContacts ?? []).map((c) => ({
            name: c.name || '',
            relationship: c.relationship || '',
            phone: c.phone || '',
          }))
        )
      } catch (error: any) {
        setError(error.response?.data?.mnessage || 'No profile found please create one')
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  },[])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(null)
      const payload = {
        dateOfBirth,
        gender,
        nationalId,
        taxId,
        contact,
        emergencyContacts,
      }
      let updated: EmployeeProfile
      if(profiles) {
        //already have profile -> update
        updated = await editEmployeeProfiles(payload)
      } else {
        //no profile -> create
        updated = await createEmployeeProfiles(payload as any)
      }

      setProfiles(updated)
      alert('Profile saved!')
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to saved profile')
    }
    console.log("Saving changes...");
    closeModal();
  };

  if(loading) return <p>Loadin....</p>
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>
           <p className="text-red-500">{error}</p>
           {profiles && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Employee Id
                </p>
                <p className={!profiles.employeeId ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.employeeId || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className={!profiles.fullName ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.fullName || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Date of Birth
                </p>
                <p className={!profiles.dateOfBirth ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.dateOfBirth || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Gender
                </p>
                <p className={!profiles.gender ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.gender || 'N/A'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  National Id
                </p>
                <p className={!profiles.nationalId ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.nationalId || 'N/A'}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Tax Id
                </p>
                <p className={!profiles.taxId ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.taxId || 'N/A'}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className={!profiles.contact?.phone ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.contact?.phone || 'N/A'}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className={!profiles.contact?.email ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.contact?.email || 'N/A'}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className={!profiles.contact?.address ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                  {profiles.contact?.address || 'N/A'}
                </p>
              </div>
              {profiles.emergencyContacts?.map((emergency, id) => (
              <div key={id} className="mb-6">
                <p className="mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Emergency Contacts
                </p>
                <div className=" ml-4 space-y-3 md:ml-0 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0">
                  <div>
                    <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Name
                    </p>
                    <p className={!emergency.name ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                      {emergency.name || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Relationship
                    </p>
                    <p className={!emergency.relationship ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                      {emergency.relationship || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className={!emergency.phone ? 'text-red-500' : 'text-sm font-medium text-gray-800 dark:text-white/90'}>
                      {emergency.phone || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              ))}
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
          {profiles ? 'Edit' : 'Add'}
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {profiles ? 'Edit Personal Information' : 'Create Personal Information'}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {profiles ? 'Update your details to keep your profile up-to-date.' : 'Fill out your information to create your profile.'}
            </p>
          </div>
          <form onSubmit={handleSave} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="dd/mm/yyyy"
                    />
                  </div>

                  <div>
                    <Label>Gender</Label>
                    <Select
                      options={genderOptions}
                      placeholder="Select Gender"
                      defaultValue={gender}            
                      onChange={(value) => setGender(value)} 
                      className="mt-1"
                    />
                </div>

                  <div>
                    <Label>National Id</Label>
                    <Input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      placeholder="National ID"
                    />
                  </div>

                  <div>
                    <Label>Tax Id</Label>
                    <Input type="text" value={taxId} onChange={(e) => setTaxId(e.target.value)} placeholder="Tax ID"/>
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Contacts
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" value={contact.phone} placeholder="Phone"  onChange={(e) => setContact({...contact, phone: e.target.value})}/>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email</Label>
                    <Input type="email" value={contact.email} placeholder="Email" onChange={(e) => setContact({...contact, email: e.target.value})} />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Address</Label>
                    <Input type="text" value={contact.address} placeholder="Address" onChange={(e) => setContact({...contact, address: e.target.value})} />
                  </div>
                </div>
              </div>

            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Emergency Contacts
              </h5>

              {emergencyContacts.map((contactItem, index) => (
                <div
                  key={index}
                  className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Contact {index + 1}
                    </p>

                    {/* delete button */}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setEmergencyContacts((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        type="text"
                        value={contactItem.name}
                        onChange={(e) =>
                          setEmergencyContacts((prev) => {
                            const updated = [...prev];
                            updated[index].name = e.target.value;
                            return updated;
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Relationship</Label>
                      <Input
                        type="text"
                        value={contactItem.relationship}
                        onChange={(e) =>
                          setEmergencyContacts((prev) => {
                            const updated = [...prev];
                            updated[index].relationship = e.target.value;
                            return updated;
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Phone</Label>
                      <Input
                        type="text"
                        value={contactItem.phone}
                        onChange={(e) =>
                          setEmergencyContacts((prev) => {
                            const updated = [...prev];
                            updated[index].phone = e.target.value;
                            return updated;
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setEmergencyContacts((prev) => [
                      ...prev,
                      { name: '', relationship: '', phone: '' },
                    ])
                  }
                >
                  + Add Contact
                </Button>
              </div>
            </div>

            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
