import sys, textwrap

SAMPLE_INPUT = textwrap.dedent("""\
8
1
2
3
7
8
12
16
144
""")

MOD = 1_000_000_007
MAX_N = 300_000
fact = [1] * (MAX_N + 1)
inv_fact = [1] * (MAX_N + 1)
for i in range(1, MAX_N + 1):
    fact[i] = fact[i - 1] * i % MOD
inv_fact[MAX_N] = pow(fact[MAX_N], MOD - 2, MOD)
for i in range(MAX_N, 0, -1):
    inv_fact[i - 1] = inv_fact[i] * i % MOD


def count_numbers(N: int) -> int:
    if N == 1:
        return 1
    res = 0
    cnt = [0] * 10

    def dfs(prod: int, start: int, sum_big: int, len_big: int):
        nonlocal res
        if prod == 1:
            ones = N - sum_big
            if ones < 0:
                return
            total = ones + len_big
            ways = fact[total] * inv_fact[ones] % MOD
            for d in range(2, 10):
                if cnt[d]:
                    ways = ways * inv_fact[cnt[d]] % MOD
            res = (res + ways) % MOD
            return
        for d in range(start, 10):
            if prod % d == 0:
                cnt[d] += 1
                dfs(prod // d, d, sum_big + d, len_big + 1)
                cnt[d] -= 1

    dfs(N, 2, 0, 0)
    return res


def main() -> None:
    if sys.stdin.isatty():
        raw = SAMPLE_INPUT.encode()
        print("Using built-in sample input:")
        print(SAMPLE_INPUT, end="")
    else:
        raw = sys.stdin.buffer.read()
        if not raw.strip():
            raw = SAMPLE_INPUT.encode()
            print("Using built-in sample input:")
            print(SAMPLE_INPUT, end="")
    nums = list(map(int, raw.split()))
    if not nums:
        return
    t, *rest = nums
    if len(rest) != t:
        return
    out = [str(count_numbers(n)) for n in rest]
    sys.stdout.write("\n".join(out) + "\n")


if __name__ == "__main__":
    main()