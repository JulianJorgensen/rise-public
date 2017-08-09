import React from 'react';
import classes from './index.css';

// icons
import 'assets/icons/regular/play.svg';
import 'assets/icons/regular/home.svg';
import 'assets/icons/regular/video.svg';
import 'assets/icons/regular/file.svg';
import 'assets/icons/regular/calendar-plus.svg';
import 'assets/icons/regular/users.svg';
import 'assets/icons/regular/cog.svg';

export const navItems = [
  {
    url: '/getting-started',
    anchor: 'Getting started',
    className: classes.gettingStarted,
    showOnlyFor: [
      'mentor-pending',
      'athlete-pending'
    ]
  },
  {
    url: '/dashboard',
    anchor: 'Dashboard',
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
    url: '/video',
    anchor: 'Video',
    className: classes.video,
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
    className: classes.exercise,
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
    anchor: 'My Athletes',
    className: classes.myAthletes,
    showOnlyFor: [
      'mentor',
      'admin'
    ]
  },
  {
    url: '/admin',
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
