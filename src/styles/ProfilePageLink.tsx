export const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: '10px 16px',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 500,
  background: isActive ? '#1976d2' : 'transparent',
  color: isActive ? '#fff' : '#1976d2',
});
