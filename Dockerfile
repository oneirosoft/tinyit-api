# ---- Build Stage ----
FROM oven/bun:latest AS build

WORKDIR /app

COPY . .

RUN bun install
RUN bun build src/index.ts --outdir dist \
    --target=bun

# ---- Runtime Stage ----
FROM oven/bun:slim AS runtime
EXPOSE 3000
WORKDIR /app

COPY --from=build /app/dist .

# Optional: copy .env only if needed (or mount separately)
# COPY .env ./

CMD ["bun", "index.js"]