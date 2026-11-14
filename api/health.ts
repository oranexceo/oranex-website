export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'healthy',
    platform: 'ORANEX Trading & Turnkey Sourcing V2',
    timestamp: new Date().toISOString(),
    version: '2.0.0-production',
    partner: 'Our Chinese partner',
    contact: {
      executive: 'Eng. Petros Abebe Mengesha',
      email: 'Oranexceo@gmail.com',
      whatsapp: '+251 912 233 688'
    }
  });
}
