import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,BsBagFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/category">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/brand">
                    <BsFillArchiveFill className='icon'/> Brand Name
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/product">
                    <BsBagFill className='icon'/> Products
                </a>
            </li>
          
            <li className='sidebar-list-item'>
                <a href="/customerDetails">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/order">
                    <BsListCheck className='icon'/> Order
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#">
                    <BsMenuButtonWideFill className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar