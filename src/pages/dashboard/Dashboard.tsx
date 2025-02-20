import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <h2>Dashboard</h2>
      <Link to={"/employer"} className="text-blue-500">Employer</Link>
    </div>
  )
}

export default Dashboard

// import React, { useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from "@ant-design/icons";
// import { Button, Layout, Menu, theme, Avatar, Input } from "antd";
// import { Outlet } from "react-router-dom";
// import { menu } from "@/static";

// const role = "employer";

// const filteredMenuData = menu.filter((item) => {
//   if (item.children && item.role.includes(role)) {
//     item.children = item.children.filter((i) => i.role.includes(role));
//     return true;
//   } else {
//     return item.role.includes(role);
//   }
// });

// const { Header, Sider, Content } = Layout;
// const { Search } = Input;

// const Dashboard: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <section>
//       <Layout className="min-h-screen">
//         <Sider
//           className="h-screen sticky top-0 left-0"
//           width={250}
//           style={{ position: "sticky" }}
//           trigger={null}
//           collapsible
//           collapsed={collapsed}
//         >
//           <div className="demo-logo-vertical " />
//           <div
//             className={`h-[50px] border-b mb-3 border-gray-700 p-3 gap-2 flex items-center delay-700 duration-200 ${
//               collapsed ? "justify-center" : "justify-start"
//             }`}
//           >
//             <div className="max-w-[36px] w-full">
//               <Avatar style={{ background: "var(--ant-primary-color)" }}>
//                 J
//               </Avatar>
//             </div>
//             {!collapsed && (
//               <p className="text-white text-xl whitespace-nowrap">{role}</p>
//             )}
//           </div>
//           <Menu theme="dark" mode="inline" items={filteredMenuData} />
//         </Sider>
//         <Layout>
//           <Header
//             style={{ padding: 0, background: colorBgContainer }}
//             className="flex items-center gap-2"
//           >
//             <Button
//               type="text"
//               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               onClick={() => setCollapsed(!collapsed)}
//               style={{
//                 fontSize: "16px",
//                 width: 64,
//                 height: 64,
//               }}
//             />
//             <Search
//               className="max-w-[400px] w-full"
//               placeholder="input search text"
//               enterButton
//             />
//           </Header>
//           <Content
//             style={{
//               margin: "24px 16px",
//               padding: 24,
//               minHeight: 280,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <Outlet />
//           </Content>
//         </Layout>
//       </Layout>
//     </section>
//   );
// };

// export default React.memo(Dashboard);
