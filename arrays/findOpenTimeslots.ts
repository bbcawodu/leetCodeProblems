/**
Note: You may use any resource on the internet to aid in solving this problem. The best solutions to
this problem are broken out into composable, reusable sub-functions. Logical organization and
readability are significantly more important than runtime efficiency.
Task
We want to write the backend for a feature that allows a customer to book a 30-minute appointment.
Your task is to implement a function
findAvailableThirtyMinuteTimeSlots that returns all of the times between start_timestamp and
end_timestamp where there is at least one operatory (room in dental office) available for 30mins. We
define an operatory as being available for 30mins at time t as one
where:
● t is a multiple of 30 minutes (e.g. 8:00am and 4:30pm )
● The Operatory is open at t
● The Operatory has no booked appointments intersecting the 30 minutes following t
Operatory
Operatories are rooms in the dental office. Each operatory is open starting at a certain hour and
ending at a certain hour.
Field Type Description
OperatoryNum number Operatory
number

OpenStartHour number Hour when
the operatory
opens (e.g. 9
means 9am)

OpenStopHour number Hour when
the operatory
closes (e.g.
5pm would
be 17)

Booked Appointment
These represent previously-booked appointments stored in the dental office's scheduling software.
Each appointment has an Operatory, a time, and a duration.
Field Type Description

AptNum number ID of the appointment on
the provider's side

Op number Reference to

Operatory.OperatoryNum

Duration number Duration in milliseconds
(can be any length; not
restricted to 30/60-min
intervals)

AptDateTime number Start time of appointment
as UNIX timestamp in
milliseconds.

Visual

Note: No timezone conversions should be necessary. All timestamps are UTC, and CodeSignal runs
your code with local time set to UTC.
Hint: Your solution should generate a list of all 30-minute intervals between the start and end and
use the constraints above to filter down to only return the 30-minute intervals that are actually

JavaScript
available. As dentist calendars are relatively small, runtime efficiency is not particularly important for
this problem.
Example Data
This reflects the general shape of the data your program will receive as input, though the specific
values will differ.

{
"start_timestamp": 1514782800000,
"end_timestamp": 1514869200000,
"appointments": [
{"AptNum": 1, "Op": 1, "Duration": 3600000, "AptDateTime":
1514829600000},
{"AptNum": 2, "Op": 2, "Duration": 3600000, "AptDateTime":
1514829600000},
{"AptNum": 3, "Op": 1, "Duration": 3600000, "AptDateTime":
1514833200000},
{"AptNum": 4, "Op": 2, "Duration": 3600000, "AptDateTime":
1514815200000},
{"AptNum": 5, "Op": 2, "Duration": 1800000, "AptDateTime":
1514836800000}
],
"operatories": [
{"OperatoryNum": 1, "OpenStartHour": 12, "OpenStopHour": 16},
{"OperatoryNum": 2, "OpenStartHour": 12, "OpenStopHour": 16}
]
}
 */

interface AppointmentTimeslot {
    start: number;
    end: number;
}

interface Operatory {
    OperatoryNum: number;
    OpenStartHour: number;
    OpenStopHour: number;
}

interface OperatoryAppointment {
    AptNum: number;
    Op: number;
    Duration: number;
    AptDateTime: number;
}

const DEFAULT_OPERATORY_APPOINTMENTS: OperatoryAppointment[] = [
{"AptNum": 1, "Op": 1, "Duration": 3600000, "AptDateTime":
1514829600000},
{"AptNum": 2, "Op": 2, "Duration": 3600000, "AptDateTime":
1514829600000},
{"AptNum": 3, "Op": 1, "Duration": 3600000, "AptDateTime":
1514833200000},
{"AptNum": 4, "Op": 2, "Duration": 3600000, "AptDateTime":
1514815200000},
{"AptNum": 5, "Op": 2, "Duration": 1800000, "AptDateTime":
1514836800000}
];

const DEFAULT_OPERATORIES: Operatory[] = [
{"OperatoryNum": 1, "OpenStartHour": 12, "OpenStopHour": 16},
{"OperatoryNum": 2, "OpenStartHour": 12, "OpenStopHour": 16}
]

function findAvailableThirtyMinuteTimeSlots(
    startTime: number,
    endTime: number,
    appointments: OperatoryAppointment[] = DEFAULT_OPERATORY_APPOINTMENTS,
    operatories: Operatory[] = DEFAULT_OPERATORIES
): AppointmentTimeslot[] {
    let availableTimeslots = buildAvailableTimeslots(startTime, endTime);

    availableTimeslots = filterOpenTimeslots(availableTimeslots, appointments, operatories);

    // Return filtered list of intervals
    return availableTimeslots;
}

// Build list of all 30 min intervals between startTime and endTime
function buildAvailableTimeslots(
    startTime: number,
    endTime: number,
): AppointmentTimeslot[] {
    const availableTimeslots: AppointmentTimeslot[] = [];

    // Round start time up to nearest 30 min interval
    let appointmentStart = new Date(startTime);
    if (appointmentStart.getUTCMinutes() !== 0 || appointmentStart.getUTCMinutes() !== 30) {
        if (appointmentStart.getUTCMinutes() < 30) {
            appointmentStart.setUTCMinutes(30);
        } else {
            appointmentStart.setUTCHours(appointmentStart.getUTCHours() + 1);
            appointmentStart.setUTCMinutes(0);
        }
    }

    while (appointmentStart.getTime() < endTime) {
        let appointmentEnd = new Date(appointmentStart.getTime() + 30 * 60 * 1000);
        if (appointmentEnd.getTime() <= endTime) {
            availableTimeslots.push(
                {
                    start: appointmentStart.getTime(),
                    end: appointmentEnd.getTime()
                }
            );
        }

        appointmentStart = new Date(appointmentEnd.getTime());
    }

    return availableTimeslots;
}

// Filter out intervals that do not have an open operatory
// An operatory is open if the interval is between the operatory's start and end hour and there are no appointments booked for the operatory during the interval
function filterOpenTimeslots(
    availableTimeslots: AppointmentTimeslot[],
    appointments: OperatoryAppointment[],
    operatories: Operatory[]
): AppointmentTimeslot[] {
    return availableTimeslots.filter(
        timeslot => checkIfTimeslotHasOpenOperatory(timeslot, appointments, operatories)
    );
}

// Return true if there is at least one operatory open during this interval without a booked appointment
function checkIfTimeslotHasOpenOperatory(
    timeslot: AppointmentTimeslot,
    appointments: OperatoryAppointment[],
    operatories: Operatory[]
): boolean {
    for (const operatory of operatories) {
        const isOperatoryOpen = checkIfOperatoryIsOpenDuringTimeslot(operatory, timeslot);

        if (isOperatoryOpen) {
            const hasAppointment = checkIfOperatoryHasAppointmentDuringTimeslot(operatory, timeslot, appointments);

            if (!hasAppointment) {
                return true;
            }
        }
    }

    return false;
}

function checkIfOperatoryIsOpenDuringTimeslot(
    operatory: Operatory,
    timeslot: AppointmentTimeslot
): boolean {
    const timeslotStart = new Date(timeslot.start);
    const timeslotEnd = new Date(timeslot.end);

    const operatoryStart = new Date(timeslotStart.getTime());
    operatoryStart.setUTCHours(operatory.OpenStartHour, 0, 0, 0);

    const operatoryEnd = new Date(timeslotStart.getTime());
    operatoryEnd.setUTCHours(operatory.OpenStopHour, 0, 0, 0);

    return timeslotStart >= operatoryStart && timeslotEnd <= operatoryEnd;
}

function checkIfOperatoryHasAppointmentDuringTimeslot(
    operatory: Operatory,
    timeslot: AppointmentTimeslot,
    appointments: OperatoryAppointment[]
): boolean {
    const timeslotStart = new Date(timeslot.start);
    const timeslotEnd = new Date(timeslot.end);
            
    for (const appointment of appointments) {
        if (operatory.OperatoryNum !== appointment.Op) {
            continue;
        }
        
        const appointmentStart = new Date(appointment.AptDateTime);
        const appointmentEnd = new Date(appointment.AptDateTime + appointment.Duration);

        if (
            timeslotStart < appointmentEnd &&
            timeslotEnd > appointmentStart
        ) {
            return true;
        }
    }

    return false;
}

let startTime = 1514782800000;
let endTime = 1514869200000;
console.log(
    findAvailableThirtyMinuteTimeSlots(startTime, endTime)
        .map(
            interval => {
                return {
                    start: new Date(interval.start).toISOString(),
                    end: new Date(interval.end).toISOString()
                };
            }
        )
);