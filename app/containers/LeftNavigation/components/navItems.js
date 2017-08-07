export const navItems = [
  {
    url: '/getting-started',
    anchor: 'Getting started',
    icon: 'fa-play',
    showOnlyFor: [
      'mentor-pending',
      'athlete-pending'
    ]
  },
  {
    url: '/dashboard',
    anchor: 'Dashboard',
    icon: 'fa-home',
    children: [
      {
        url: '/dashboard/profile',
        anchor: 'Profile'
      },
      {
        url: '/dashboard/settings',
        anchor: 'Settings'
      }
    ]
  },
  // {
  //   url: '/chat',
  //   anchor: 'Chat',
  //   icon: 'fa-comments',
  //   children: [
  //     {
  //       url: '/inbox',
  //       anchor: 'Inbox',
  //       disabled: true
  //     },
  //     {
  //       url: '/sent',
  //       anchor: 'Sent',
  //       disabled: true
  //     }
  //   ]
  // },
  {
    url: '/video',
    anchor: 'Video',
    icon: 'fa-video-camera',
    children: [
      {
        url: '/video/logs',
        anchor: 'Call logs'
      }
    ]
  },
  {
    url: '/library',
    anchor: 'Exercise Library',
    icon: 'fa-files-o',
    children: [
      {
        url: '/sport-1',
        anchor: 'Sport 1',
        disabled: true
      },
      {
        url: '/sport-2',
        anchor: 'Sport 2',
        disabled: true
      }
    ]
  },
  {
    url: '/schedule',
    anchor: 'Schedule',
    icon: 'fa-calendar'
  },
  // {
  //   url: '/activity',
  //   anchor: 'Account Activity',
  //   icon: 'fa-tasks',
  //   children: [
  //     {
  //       url: '/login-time',
  //       anchor: 'Login Time',
  //       disabled: true
  //     },
  //     {
  //       url: '/payments',
  //       anchor: 'Payments',
  //       disabled: true
  //     },
  //     {
  //       url: '/overview',
  //       anchor: 'Overview',
  //       disabled: true
  //     }
  //   ]
  // },
  {
    url: '/my-athletes',
    anchor: 'My Athletes',
    icon: 'fa-users',
    showOnlyFor: [
      'mentor',
      'admin'
    ]
  },
  {
    url: '/admin',
    anchor: 'Admin',
    icon: 'fa-cogs',
    showOnlyFor: [
      'admin'
    ],
    children: [
      {
        url: '/admin/users',
        anchor: 'Users'
      },
      {
        url: '/admin/call-logs',
        anchor: 'Call Logs'
      }
    ]
  }
];

export default navItems;
