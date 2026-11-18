import { canAttendMeetings } from "../canAttendMeetings";
import { describe, it, expect} from "@jest/globals";

describe(
    "bestTimeToBuyStocks",
    () => {
        it(
            "should pass tests",
            () => {
                let intervals = [[0,30],[5,10],[15,20]];
                expect(canAttendMeetings(intervals)).toBe(false);

                intervals = [[1,2],[2,3],[3,4]];
                expect(canAttendMeetings(intervals)).toBe(true);

                intervals = [[10,20],[20,30],[30,40]];
                expect(canAttendMeetings(intervals)).toBe(true);

                intervals = [[1,2],[1,3]];
                expect(canAttendMeetings(intervals)).toBe(false);
            }
        );
    }
);