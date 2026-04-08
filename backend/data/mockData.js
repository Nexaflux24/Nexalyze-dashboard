import bcrypt from 'bcryptjs';

const passwordHash = bcrypt.hashSync('password123', 10);

export const users = [
  {
    id: 'user-1',
    email: 'admin@nexalyze.com',
    password: passwordHash,
    firstName: 'Admin',
    lastName: 'User',
    role: 'Admin'
  },
  {
    id: 'user-2',
    email: 'user@nexalyze.com',
    password: passwordHash,
    firstName: 'Regular',
    lastName: 'User',
    role: 'User'
  }
];

export const analyticsOverviewData = {
  totalTraffic: 12450,
  totalConversions: 540,
  conversionRate: 4.3,
  totalRevenue: 18500,
  bounceRate: 32.1,
  avgSessionDuration: 4.2
};

export const analyticsSeriesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  traffic: [3200, 4100, 3800, 4700, 5200],
  conversions: [90, 120, 140, 155, 185],
  revenue: [4200, 5300, 5800, 6100, 7000],
  sources: [
    { label: 'Direct', value: 35 },
    { label: 'Organic Search', value: 28 },
    { label: 'Paid', value: 18 },
    { label: 'Referral', value: 12 },
    { label: 'Social', value: 7 }
  ],
  platforms: [
    { label: 'Desktop', value: 48 },
    { label: 'Mobile', value: 39 },
    { label: 'Tablet', value: 13 }
  ]
};

export const campaigns = [
  {
    id: 'cmp-1',
    name: 'New Product Launch',
    source: 'Paid Search',
    clicks: 11200,
    conversions: 540,
    budget: 7200,
    spent: 6200,
    revenue: 18500,
    ownerEmail: 'admin@nexalyze.com'
  },
  {
    id: 'cmp-2',
    name: 'Brand Awareness',
    source: 'Social Media',
    clicks: 8200,
    conversions: 240,
    budget: 4200,
    spent: 3900,
    revenue: 9100,
    ownerEmail: 'admin@nexalyze.com'
  },
  {
    id: 'cmp-3',
    name: 'Newsletter Signup',
    source: 'Email',
    clicks: 5400,
    conversions: 140,
    budget: 2600,
    spent: 2150,
    revenue: 5600,
    ownerEmail: 'user@nexalyze.com'
  },
  {
    id: 'cmp-4',
    name: 'Website Retargeting',
    source: 'Display',
    clicks: 6800,
    conversions: 210,
    budget: 3100,
    spent: 3000,
    revenue: 7200,
    ownerEmail: 'user@nexalyze.com'
  }
];

export const addUser = async ({ email, password, firstName, lastName, role }) => {
  const id = `user-${users.length + 1}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id, email, password: hashedPassword, firstName, lastName, role };
  users.push(newUser);
  return newUser;
};
