import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('supabase.co') ? { rejectUnauthorized: false } : undefined
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const createApplication = async (req, res) => {
  try {
    const data = req.body;

    // Check for duplicate roll number 
    const existing = await prisma.application.findUnique({
      where: { rollNumber: data.rollNumber }
    });

    if (existing) {
      return res.status(409).json({ error: 'This roll number has already been registered.' });
    }

    const application = await prisma.application.create({
      data: {
        ...data,
        domainsInterested: JSON.stringify(data.domainsInterested)
      }
    });

    return res.status(201).json({
      id: application.id,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return res.status(500).json({ error: 'Internal server error during application submission' });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' }
    });
    const parsedApplications = applications.map(app => ({
      ...app,
      domainsInterested: JSON.parse(app.domainsInterested)
    }));

    return res.status(200).json(parsedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ error: 'Internal server error fetching applications' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status }
    });

    return res.status(200).json({
      message: 'Status updated successfully',
      application: {
        ...application,
        domainsInterested: JSON.parse(application.domainsInterested)
      }
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return res.status(500).json({ error: 'Internal server error updating status' });
  }
};
