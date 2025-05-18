import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import TopSellers from './TopSellers'
import PopularBlogs from './PopularBlogs'

const Layout = () => {
  return (
    <div className='flex h-screen'>
        <Sidebar/>
        <div className='rounded w-full flex justify-between flex-wrap'>
          <Outlet/>
        </div>
        <div className=''>
          <TopSellers/>
          <PopularBlogs/>
        </div>
    </div>
  )
}

export default Layout