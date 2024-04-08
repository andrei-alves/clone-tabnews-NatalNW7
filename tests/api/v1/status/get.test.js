test("GET /status should return 200", async () => {
  const res = await fetch("http://localhost:3000");
  expect(res.status).toBe(200);
});
