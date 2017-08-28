import React from 'react';
import classes from './index.css';

// icons
import HomeIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/home.svg';
import AngleDoubleRightIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/angle-double-right.svg';
import CalendarIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/calendar.svg';
import CalendarPlusIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/calendar-plus.svg';
import UsersIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/users.svg';
import CogIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/cog.svg';

export const navItems = [
  {
    url: '/dashboard',
    anchor: 'Dashboard',
    icon: <HomeIcon />,
    className: classes.dashboard,
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
  //   icon: 'comments',
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
    url: '/meetings',
    icon: <CalendarIcon />,
    anchor: 'Meetings',
    className: classes.meetings,
    // children: [
    //   {
    //     url: '/meetings/logs',
    //     anchor: 'Call logs'
    //   }
    // ]
  },
  // {
  //   url: '/library',
  //   anchor: 'Exercise Library',
  //   className: classes.exercise,
  //   children: [
  //     {
  //       url: '/sport-1',
  //       anchor: 'Sport 1',
  //       disabled: true
  //     },
  //     {
  //       url: '/sport-2',
  //       anchor: 'Sport 2',
  //       disabled: true
  //     }
  //   ]
  // },
  {
    url: '/schedule',
    icon: <CalendarPlusIcon />,
    anchor: 'Schedule',
    className: classes.schedule
  },
  // {
  //   url: '/activity',
  //   anchor: 'Account Activity',
  //   icon: 'tasks',
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
    icon: <UsersIcon />,
    anchor: 'My Athletes',
    className: classes.myAthletes,
    showOnlyFor: [
      'mentor',
      'admin'
    ]
  },
  {
    url: '/admin',
    icon: <CogIcon />,
    anchor: 'Admin',
    className: classes.admin,
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
