import { campaigns } from '../data/mockData.js';

export const getCampaigns = (req, res) => {
  const { role, email } = req.user || {};

  if (role === 'Admin') {
    return res.json(campaigns);
  }

  const filtered = campaigns.filter((campaign) => campaign.ownerEmail === email);
  res.json(filtered);
};
