/***************************************************************************/
/* Converts date and complete time to user's preferred timezone and format */
/* Example: 2023-24-12 12:00:00 AM                                         */
/***************************************************************************/

export function dateTimeFormatter(
  inputDate: Date,
  desiredFormat: string = "MMDDYYYYHHMM",
  desiredStructure: string = "MMM DD YYYY"
): string {
  // Check if inputDate is a valid date
  const parsedDate = inputDate;

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date or time";
  }

  let hours;

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour clock with AM/PM
  };

  // Get date components
  switch (desiredFormat) {
    case "MMDDYYYYHHMMSS":
      hours = parsedDate.toLocaleString().split(", ")[1];
      break;
    case "MMDDYYYYHHMM":
      hours = parsedDate.toLocaleTimeString(undefined, timeOptions);
      break;
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[parsedDate.getMonth()];

  let formattedDate;

  switch (desiredFormat) {
    case "MMDDYYYYHHMMSS":
      switch (desiredStructure) {
        case "MM-DD-YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate} ${hours}`;
        case "MM/DD/YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate} ${hours}`;
        case "MMM DD YYYY":
          formattedDate = desiredStructure
            .replace("MMM", monthName)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate} ${hours}`;
        case "DD-MM-YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate} ${hours}`;
        case "DD/MM/YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate} ${hours}`;
        case "DD MMM YYYY":
          formattedDate = desiredStructure
            .replace("MMM", monthName)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate} ${hours}`;
        default:
          return "Invalid date format";
      }

    case "MMDDYYYYHHMM":
      switch (desiredStructure) {
        case "MM-DD-YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate}, ${hours}`;
        case "MM/DD/YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate}, ${hours}`;
        case "MMM DD YYYY":
          formattedDate = desiredStructure
            .replace("MMM", monthName)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate}, ${hours}`;
        case "DD-MM-YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate}, ${hours}`;
        case "DD/MM/YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate}, ${hours}`;
        case "DD MMM YYYY":
          formattedDate = desiredStructure
            .replace("MMM", monthName)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return `${formattedDate}, ${hours}`;
        default:
          return "Invalid date format";
      }

    case "MMDDYYYY":
      switch (desiredStructure) {
        case "MM-DD-YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return formattedDate;
        case "MM/DD/YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return formattedDate;
        case "MMM DD YYYY":
          formattedDate = desiredStructure
            .replace("MMM", monthName)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return formattedDate;
        case "DD-MM-YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return formattedDate;
        case "DD/MM/YYYY":
          formattedDate = desiredStructure
            .replace("MM", month)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return formattedDate;
        case "DD MMM YYYY":
          formattedDate = desiredStructure
            .replace("MMM", monthName)
            .replace("DD", day)
            .replace("YYYY", year.toString());
          return formattedDate;
        default:
          return "Invalid date format";
      }

    case "HHMM":
      switch (desiredStructure) {
        case "MM-DD-YYYY":
          return `${hours}`;
        case "MM/DD/YYYY":
          return `${hours}`;
        case "MMM DD YYYY":
          return `${hours}`;
        case "DD-MM-YYYY":
          return `${hours}`;
        case "DD/MM/YYYY":
          return `${hours}`;
        case "DD MMM YYYY":
          return `${hours}`;
        default:
          return "Invalid date format";
      }

    default:
      return "Invalid date format";
  }
}

/****************************************************/
/* Used by other functions, and other DatePickers   */
/* for the 'selected' prop                          */
/****************************************************/

// export function timezoneFormatter(date, timezone) {
//   return new Date(
//     (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
//       timeZone: timezone,
//     })
//   );
// }

// export function datePickerDateFormatter(date) {
//   // We just have to uncapitalize YYYY and DD to make it work
//   return date.replace("YYYY", "yyyy").replace("DD", "dd");
// }
