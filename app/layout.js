export const metadata = {
  title: 'Money Pilot',
  description: 'Personal Finance Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}