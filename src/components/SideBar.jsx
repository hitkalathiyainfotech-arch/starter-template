import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Drawer, Box, Typography, Avatar, Chip, useMediaQuery, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { LayoutDashboard, Users, FileText, Settings, ChevronDown, ChevronRight, Bell, HelpCircle, LogOut, Package, ShoppingCart, Layers, MessageSquare, MessageCircleDashed } from 'lucide-react'

const drawerWidth = 280

export default function SideBar() {
  const [openMenus, setOpenMenus] = useState(['products'])
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')

  const toggleMenu = id => {
    setOpenMenus(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id])
  }

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/' },
    { id: 'chat', label: 'Chat', icon: MessageCircleDashed, to: '/chat' },
    {
      id: 'products', label: 'Products', icon: Package,
      children: [
        { id: 'all-products', label: 'All Products', to: '/products' },
        { id: 'categories', label: 'Categories', to: '/products/categories' },
        { id: 'inventory', label: 'Inventory', to: '/products/inventory' }
      ]
    },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, to: '/orders', badge: '12' },
    { id: 'customers', label: 'Customers', icon: Users, to: '/customers' },
    { id: 'reports', label: 'Reports', icon: FileText, to: '/reports' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, to: '/messages', badge: '5' }
  ]

  const systemMenu = [
    { id: 'notifications', label: 'Notifications', icon: Bell, to: '/notifications' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, to: '/help' },
    { id: 'settings', label: 'Settings', icon: Settings, to: '/settings' }
  ]

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box className="d-flex align-items-center gap-3 px-4 py-3 border-bottom">
        <Box
          className="rounded d-flex align-items-center justify-content-center"
          sx={{
            width: 42,
            height: 42,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #2563eb, #1e40af)',
            boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.35)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(15deg)',
              boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.45), 0 8px 20px rgba(37,99,235,0.45)'
            }
          }}
        >
          <Layers color="#ffffff" size={22} />
        </Box>
        <Box>
          <Typography fontWeight={700} fontSize="1rem">Helpyzo</Typography>
          <Typography fontSize="0.75rem" color="text.secondary">Admin Panel</Typography>
        </Box>
      </Box>

      <Box className="px-3 py-3 border-bottom">
        <Box className="d-flex align-items-center gap-3 p-2 rounded bg-light">
          <Avatar sx={{ bgcolor: 'primary.main', width: 42, height: 42 }}>HD</Avatar>
          <Box className="flex-grow-1">
            <Typography fontSize="0.9rem" fontWeight={600}>Hit Dhameliya</Typography>
            <Typography fontSize="0.75rem" color="text.secondary">heetdhameliya59@gmail.com</Typography>
          </Box>
        </Box>
      </Box>

      <Box className="flex-grow-1 overflow-auto px-3 py-3">
        <Typography className="text-uppercase px-2 mb-2" fontSize="0.7rem" fontWeight={600} color="text.secondary">Main Menu</Typography>
        {menu.map(item => {
          const Icon = item.icon
          const open = openMenus.includes(item.id)
          if (item.children) {
            return (
              <Box key={item.id} className="mb-1">
                <button onClick={() => toggleMenu(item.id)} className="btn w-100 d-flex align-items-center justify-content-between px-3 py-2 text-start btn-light">
                  <span className="d-flex align-items-center gap-3">
                    <Icon size={20} />
                    {item.label}
                  </span>
                  {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {open && (
                  <Box className="ms-4 mt-1">
                    {item.children.map(sub => (
                      <NavLink key={sub.id} to={sub.to} className={({ isActive }) => `btn w-100 text-start px-3 py-2 mb-1 ${isActive ? 'btn-primary bg-opacity-10 text-primary fw-semibold' : 'btn-light'}`}>
                        {sub.label}
                      </NavLink>
                    ))}
                  </Box>
                )}
              </Box>
            )
          }
          return (
            <NavLink key={item.id} to={item.to} className={({ isActive }) => `btn w-100 d-flex align-items-center justify-content-between px-3 py-2 mb-1 ${isActive ? 'btn-primary' : 'btn-light'}`}>
              <span className="d-flex align-items-center gap-3">
                <Icon size={20} />
                {item.label}
              </span>
              {item.badge && <Chip size="small" label={item.badge} />}
            </NavLink>
          )
        })}
      </Box>

      <Box className="border-top px-3 py-3">
        <Typography className="text-uppercase px-2 mb-2" fontSize="0.7rem" fontWeight={600} color="text.secondary">System</Typography>
        {systemMenu.map(item => {
          const Icon = item.icon
          return (
            <NavLink key={item.id} to={item.to} className={({ isActive }) => `btn w-100 d-flex align-items-center gap-3 px-3 py-2 mb-1 ${isActive ? 'btn-primary' : 'btn-light'}`}>
              <Icon size={20} />
              {item.label}
            </NavLink>
          )
        })}
        <button className="btn w-100 d-flex align-items-center gap-3 px-3 py-2 text-danger btn-light mt-2">
          <LogOut size={20} />
          Logout
        </button>
      </Box>
    </Box>
  )

  return (
    <>
      {isMobile && (
        <IconButton onClick={handleDrawerToggle} sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1200, border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #e5e7eb'
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}