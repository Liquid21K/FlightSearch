import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import UsersList from "./UsersList"

export default function AdminTabs() {
  let tabs = [
    {
      id: "users",
      label: "Users",
      content: (
        <div>
          <h2 className="text-lg font-semibold mb-2">User Management</h2>
          <p>
            View, edit, and manage all registered users. You can grant admin privileges or deactivate accounts.
          </p>
            <UsersList/>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <div>
          <h2 className="text-lg font-semibold mb-2">Admin Settings</h2>
          <p>
            Adjust site-wide settings and configurations. Manage themes, integrations, and other global options.
          </p>
        </div>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      content: (
        <div>
          <h2 className="text-lg font-semibold mb-2">Reports & Analytics</h2>
          <p>
            Access system usage reports, analytics, and performance data to monitor and improve the platform.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Admin Dashboard Tabs" className=" justify-center" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
