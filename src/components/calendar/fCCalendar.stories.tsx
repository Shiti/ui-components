import type { Meta } from '@storybook/react'

import FCCalendar from './fCCalendar'

const meta: Meta<React.ComponentProps<typeof FCCalendar>> = {
  title: 'Rustic UI/Calendar/FC Calendar',
  component: FCCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `FCCalendar` component integrates the [FullCalendar](https://fullcalendar.io/docs) library to provide a versatile and interactive calendar view for managing events. It allows users to view events across different time frames and provides features for navigation.\n\n **Note**: On mobile screens, the calendar will default to the day view, offering users a detailed perspective of events for the selected day. Conversely, on larger screens, such as desktops or tablets, the calendar will default to the month view, offering users an overview of events scheduled throughout the month.',
      },
    },
  },
}

meta.argTypes = {
  ...meta.argTypes,
  events: {
    table: {
      type: {
        summary: 'Array of CalendarEvent.\n',
        detail:
          'Each CalendarEvent has the following fields:\n' +
          '  start: ISO8601 string representation of start date and time of the event.\n' +
          '  end: ISO8601 string representation of end date and time of the event.\n' +
          '  title: Optional string representing title or name of the event.\n' +
          '  location: Optional string of address or link where the event is happening.\n' +
          '  description: Optional string with information about the event.\n' +
          '  isAllDay: Optional boolean value indicating whether the event lasts the entire day.',
      },
    },
  },
}

export default meta

export const Default = {
  args: {
    events: [
      {
        start: '2024-02-07T10:00:00',
        end: '2024-02-07T12:00:00',
        title: 'Aquarium',
      },
      {
        start: '2024-02-07T12:00:00',
        end: '2024-02-07T14:00:00',
        title: 'Lunch',
      },
      {
        start: '2024-02-08T09:00:00',
        title: 'Niagara Falls',
      },
      {
        start: '2024-02-08T12:00:00',
        end: '2024-02-08T14:00:00',
      },
      {
        start: '2024-02-09T14:00:00',
        end: '2024-02-09T16:00:00',
        title: 'Casa Loma',
      },
      {
        start: '2024-02-09T10:30:00',
        end: '2024-02-09T12:30:00',
        title: 'Royal Ontario Museum',
      },
    ],
  },
}

export const AllDayEvents = {
  args: {
    events: [
      {
        start: '2024-02-01T10:00:00',
        end: '2024-02-01T12:00:00',
        title: 'Aquarium',
      },
      {
        start: '2024-02-03T12:00:00',
        end: '2024-02-07T14:00:00',
        title: 'Niagara Falls',
        isAllDay: true,
      },
    ],
  },
}
