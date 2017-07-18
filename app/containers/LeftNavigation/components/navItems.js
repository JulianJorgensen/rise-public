export const navItems = [
  {
    url: 'dashboard',
    anchor: 'Dashboard',
    icon: 'fa-home',
    children: [
      {
        url: 'getting-started',
        anchor: 'Getting started'
      },
      {
        url: 'profile',
        anchor: 'Profile'
      },
      {
        url: 'settings',
        anchor: 'Settings'
      }
    ]
  },
  {
    url: 'chat',
    anchor: 'Chat',
    icon: 'fa-comments',
    children: [
      {
        url: 'inbox',
        anchor: 'Inbox',
        disabled: true
      },
      {
        url: 'sent',
        anchor: 'Sent',
        disabled: true
      }
    ]
  },
  {
    url: 'video',
    anchor: 'Video',
    icon: 'fa-video-camera',
    children: [
      {
        url: 'log',
        anchor: 'Call log'
      },
      {
        url: 'contacts',
        anchor: 'Contacts',
        disabled: true
      }
    ]
  },
  {
    url: 'library',
    anchor: 'Exercise Library',
    icon: 'fa-files-o',
    children: [
      {
        url: 'sport-1',
        anchor: 'Sport 1',
        disabled: true
      },
      {
        url: 'sport-2',
        anchor: 'Sport 2',
        disabled: true
      }
    ]
  },
  {
    url: 'schedule',
    anchor: 'Schedule',
    icon: 'fa-calendar'
  },
  {
    url: 'activity',
    anchor: 'Account Activity',
    icon: 'fa-tasks',
    children: [
      {
        url: 'login-time',
        anchor: 'Login Time',
        disabled: true
      },
      {
        url: 'payments',
        anchor: 'Payments',
        disabled: true
      },
      {
        url: 'overview',
        anchor: 'Overview',
        disabled: true
      }
    ]
  },
  {
    url: 'my-athletes',
    anchor: 'My Athletes',
    icon: 'fa-users',
    showOnlyFor: 'mentor',
    children: [
      {
        url: 'profiles',
        anchor: 'Profiles',
        disabled: true
      }
    ]
  }
];

export default navItems;
