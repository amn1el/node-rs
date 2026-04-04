import test from 'ava';
import humanize from '../lib';

const
  // best way to test. is used discord timestamp from snowflake
  DiscordEpoch = 1420070400000n,
  // Discord ID (snowflake)
  DiscordID = 604227193651986443n,
  // Static date for test
  Utc = new Date('2026-04-02T22:08:07.839Z'),
  // Timestamp from snowflake (discord ID)
  Timestamp = (Utc.getTime() - Number((DiscordID >> 22n) + DiscordEpoch)),
  // Normal result without args and shorts
  SinceAbbrev = '6y 8m 1w 5d 13h 44min 58sec',
  // Normal result without args
  Since = '6 years, 8 months, 1 week, 5 days, 13 hours, 44 minutes and 58 seconds';

test('duration', (t) => {
  let duration = humanize.duration(Timestamp);

  t.not(duration, '0');
  t.is(duration, Since, 'duration is not equal');
  t.not(duration, SinceAbbrev);

  duration = humanize.duration(Timestamp, 7, true);
  t.not(duration, '0');
  t.not(duration, Since);
  t.is(duration, SinceAbbrev, 'duration is not equal in abbrev');
});

test('maxUnits', (t) => {
  let duration = humanize.duration(Timestamp, 1);
  t.not(duration, '0');
  t.is(duration, '6 years', 'duration is not equal with max 1');

  duration = humanize.duration(Timestamp, 2);
  t.not(duration, '0');
  t.is(duration, '6 years and 8 months', 'duration is not equal with max 2');

  duration = humanize.duration(Timestamp, 3);
  t.not(duration, '0');
  t.is(duration, '6 years, 8 months and 1 week', 'duration is not equal with max 3');

  duration = humanize.duration(Timestamp, 4);
  t.not(duration, '0');
  t.is(duration, '6 years, 8 months, 1 week and 5 days', 'duration is not equal with max 4');

  duration = humanize.duration(Timestamp, 5);
  t.not(duration, '0');
  t.is(duration, '6 years, 8 months, 1 week, 5 days and 13 hours', 'duration is not equal with max 5');

  duration = humanize.duration(Timestamp, 6);
  t.not(duration, '0');
  t.is(duration, '6 years, 8 months, 1 week, 5 days, 13 hours and 44 minutes', 'duration is not equal with max 6');
});

test('short', (t) => {
  let duration = humanize.duration(Timestamp, 1, true);
  t.not(duration, '0');
  t.is(duration, '6y', 'duration is not equal with max 1 and short');

  duration = humanize.duration(Timestamp, 2, true);
  t.not(duration, '0');
  t.is(duration, '6y 8m', 'duration is not equal with max 2 and short');

  duration = humanize.duration(Timestamp, 3, true);
  t.not(duration, '0');
  t.is(duration, '6y 8m 1w', 'duration is not equal with max 3 and short');

  duration = humanize.duration(Timestamp, 4, true);
  t.not(duration, '0');
  t.is(duration, '6y 8m 1w 5d', 'duration is not equal with max 4 and short');

  duration = humanize.duration(Timestamp, 5, true);
  t.not(duration, '0');
  t.is(duration, '6y 8m 1w 5d 13h', 'duration is not equal with max 5 and short');

  duration = humanize.duration(Timestamp, 6, true);
  t.not(duration, '0');
  t.is(duration, '6y 8m 1w 5d 13h 44min', 'duration is not equal with max 6 and short');

  duration = humanize.duration(Timestamp, 7, true);
  t.not(duration, '0');
  t.is(duration, SinceAbbrev, 'duration is not equal with max 7 and short');
});
