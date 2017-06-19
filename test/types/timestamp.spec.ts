import { suite, test } from "mocha-typescript";
import { expect } from "chai";

import TimestampType from "../../src/types/timestamp";

@suite class TimestampTypeTest {
  @test "parses valid UTC RFC3339 timestamps"() {
    expect((new TimestampType).decode("2016-10-02T07:31:51Z")).to.be.a.instanceOf(Date);
  }

  @test "throws Error on RFC3339 timestamp with non-UTC time zone"() {
    expect(() => (new TimestampType).decode("2016-10-02T07:31:51-08:00")).to.throw(Error);
  }
}
