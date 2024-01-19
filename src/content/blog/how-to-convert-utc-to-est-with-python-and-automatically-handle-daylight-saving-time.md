---
title: How to Convert UTC to EST with Python and Automatically Handle Daylight Saving Time
description: Learn how to convert UTC to EST with Python and automatically handle daylight saving time.
pubDatetime: 2023-03-14T00:00:00.000Z
tags:
  - tutorial
  - python
---

Converting between timezones may seem like a straightforward task involving the calculation of the time difference between a location and UTC. However, this is not the case because firstly, timezones are not uniformly divided, and secondly, the daylight saving time (DST) adds further complexity to the process, as it varies depending on the time of the year and location.

In this post, we will learn how to convert UTC time to EST (Eastern Standard Time). We will also take care of daylight saving automatically.

In order to perform time zone conversions effectively and with minimal frustration, it is recommended to use the [Olson database](https://en.wikipedia.org/wiki/Tz_database) via the [pytz](https://pypi.org/project/pytz/) module. This will ensure that we take into account the specific time zone rules and daylight saving time transitions that apply to the location we are working with.

1. Install `pytz` using `pip` command:

```bash
pip install pytz
```

1. Create a python file and import `datetime` and `pytz` modules

```python
import datetime
import pytz

def utc_to_est(utc_time):
    pass # to be implemented
```

1. We're creating a function to convert UTC time to EST

2. Let's implement this function and also write `main()` to drive the program and test

```python
import datetime
import pytz

def utc_to_est(utc_time):
    '''Converts UTC time to EST time'''

    # Get the timezone info for EST
    est = pytz.timezone('US/Eastern')

    # Convert the UTC time to EST
    est_time = utc_time.astimezone(est)
    return est_time

def main():
    # Let's use 2023 Mar 9 10:0:0 Hrs UTC
    utc_time = datetime.datetime(2023, 3, 9, 10, 0, 0, tzinfo=pytz.utc)

    # Calling the fucntion to get EST
    est_time = utc_to_est(utc_time)

    print('UTC time: ', utc_time.strftime('%Y-%m-%d %H:%M:%S %Z'))
    print('EST time: ', est_time.strftime('%Y-%m-%d %H:%M:%S %Z'))

if __name__ == '__main__':
    main()
```

Output:

```sh
UTC time:  2023-03-09 10:00:00 UTC
EST time:  2023-03-09 05:00:00 EST
```

If, instead, you want to convert the current UTC time, use `now()` method:

```python
utc_time = datetime.datetime.now(tz=pytz.utc)
```

In order to understand the working of the code, we can begin with the `datetime.datetime()` method. This method is used to create a `datetime` object, which includes a specific date and time. To obtain a _timezone-aware_ object that comprises timezone information, we also pass `tzinfo=pytz.utc`. Similarly, in the [`datetime.datetime.now`](http://datetime.datetime.now)`()` method we pass `tz=pytz.utc`.

The `pytz.timezome()` method used in the `utc_to_est` function to retrieve the timezone information of the given timezone code. This method also takes care of the daylight saving automatically based on the time of year. **Note**: It is generally recommended to use the `US/Eastern` timezone identifier rather than `EST` in python since it handles DST more effectively.

Lastly, the `astimezone()` method is used to convert a timezone-aware `datetime` object from one timezone to another. We convert from UTC to EST and return the resulting object.

In conclusion, converting UTC to EST with Python is a straightforward process, but accounting for daylight saving time can be tricky. Thankfully, there are libraries like `pytz` and `datetime` that make this process much simpler.
