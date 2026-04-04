use napi_derive::napi;

const SECOND: f64 = 1000.0;
const MINUTE: f64 = 60.0 * SECOND;
const HOUR: f64 = 60.0 * MINUTE;
const DAY: f64 = 24.0 * HOUR;
const WEEK: f64 = 7.0 * DAY;
const MONTH: f64 = 30.0 * DAY;
const YEAR: f64 = 365.0 * DAY;

const UNITS: [(f64, &str, &str, &str); 7] = [
  (YEAR, "year", "years", "y"),
  (MONTH, "month", "months", "m"),
  (WEEK, "week", "weeks", "w"),
  (DAY, "day", "days", "d"),
  (HOUR, "hour", "hours", "h"),
  (MINUTE, "minute", "minutes", "min"),
  (SECOND, "second", "seconds", "sec"),
];

const MAX_MS: f64 = f64::MAX / 1000.0;

/**
 * Humanize a duration in milliseconds to a string.
 *
 * @param {number} ms - the duration in milliseconds.
 * @param {number} [maxUnits=7] - the maximum number of units to display (default is 7).
 * @param {boolean} [short=false] - Whether to use short abbreviations (default is false)
 * @returns {string} a human-readable string representation of the duration.
 */
#[napi]
pub fn duration(ms: f64, max_units: Option<i32>, short: Option<bool>) -> String {
  if ms <= 0.0 || ms > MAX_MS {
    return "0".to_string();
  }

  let is_short = short.unwrap_or(false);
  let max = max_units.unwrap_or(7).clamp(1, 7) as usize;
  let mut units = Vec::with_capacity(max);
  let mut remaining_ms = ms;

  for &(divisor, singular, plural, abbrev) in UNITS.iter() {
    if units.len() >= max {
      break;
    }

    let value = (remaining_ms / divisor).floor();

    if value > 0.0 {
      remaining_ms -= value * divisor;

      units.push(if is_short {
        format!("{value:.0}{abbrev}")
      } else if value > 1.0 {
        format!("{value:.0} {plural}")
      } else {
        format!("{value:.0} {singular}")
      });
    }
  }

  if units.is_empty() {
    return "0".to_string();
  }

  if is_short || units.len() == 1 {
    units.join(" ")
  } else {
    let len = units.len();
    let mut result = String::with_capacity(units.iter().map(|s| s.len()).sum::<usize>() + len * 2);
    for (i, unit) in units.iter().enumerate() {
      if i > 0 {
        result.push_str(if i == len - 1 { " and " } else { ", " });
      }
      result.push_str(unit);
    }
    result
  }
}
