import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

export default function BasicTableOne() {
  return (
     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header with title and search */}
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Latest Transactions
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search…"
            className="w-48 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          />
          <svg
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
            />
          </svg>
        </div>
      </div>
            <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-t border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-400 dark:text-gray-500"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-400 dark:text-gray-500"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-400 dark:text-gray-500"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-400 dark:text-gray-500"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-400 dark:text-gray-500"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-6 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.user.image}
                      alt={order.user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800 dark:text-white">
                        {order.user.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {order.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Nov 23, 01:00 PM
                </TableCell>

                <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {order.budget}
                </TableCell>

                <TableCell className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {order.projectName}
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          ← Previous
        </button>
        <div className="flex items-center gap-1">
          <button className="h-8 w-8 rounded-md bg-brand-100 text-brand-600">
            1
          </button>
          <button className="h-8 w-8 text-gray-600">2</button>
          <button className="h-8 w-8 text-gray-600">3</button>
          <span className="text-gray-400">…</span>
          <button className="h-8 w-8 text-gray-600">10</button>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Next →
        </button>
      </div>
    </div>
  );
}
