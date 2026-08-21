const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const slugChanges = [
    { source: '/about-us', destination: '/about', permanent: true },
    { source: '/past-scholars', destination: '/scholars', permanent: true },
    { source: '/apply', destination: '/pipeline', permanent: true },
  ]

  return [...slugChanges, internetExplorerRedirect]
}

export default redirects
