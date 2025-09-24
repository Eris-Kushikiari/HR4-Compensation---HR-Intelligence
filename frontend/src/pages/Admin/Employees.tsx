import BasicTableOne from '../../components/tables/BasicTables/BasicTableOne'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'

const Employees = () => {
  return (
    <>
    <PageBreadcrumb pageTitle="Employees" />
    <div className=" p-5  lg:p-6">
        <BasicTableOne/>
    </div>
    </>
  )
}

export default Employees