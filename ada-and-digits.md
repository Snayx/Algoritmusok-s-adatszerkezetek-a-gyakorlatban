# Ada and Digits

A program megszámolja, hány olyan szám létezik, aminek a számjegyeinek szorzata egy adott N.

## Hogyan működik

### Előszámítás

```python
fact = [1] * (MAX_N + 1)
inv_fact = [1] * (MAX_N + 1)
```

Faktoriálisokat és inverz faktoriálisokat számolok előre egy tömbben, mert később sokszor kell majd osztani faktoriálisokkal, és modulo mellett ez csak inverz szorzással megy. Az inverznél Fermat-kis-tételt használom (`pow(x, MOD-2, MOD)`).

### A fő logika: DFS

```python
def dfs(prod: int, start: int, sum_big: int, len_big: int):
```

Rekurzívan bontom fel N-et 2-9 közötti számjegyekre. A `prod` a még felbontatlan rész, a `start` azért kell, hogy ne számoljak duplán (mindig csak >= számjeggyel megyek tovább). A `sum_big` és `len_big` követi, hogy eddig mennyi számjegyet használtam és mekkora az összegük.

### Miért kell a cnt tömb?

```python
cnt = [0] * 10
```

Ez számolja, hogy melyik számjegyből hányat használtam az aktuális felbontásban. Amikor kész egy felbontás, ebből számolom ki a permutációk számát — ha pl. van 3 db kettes, azokat nem kell megkülönböztetni, ezért osztok `3!`-sal.

### Az eredmény számítása

Amikor `prod == 1`, megvan egy érvényes felbontás. Ilyenkor kiszámolom, hány 1-es kell még hogy a számjegyek összege N legyen, majd a multinomiális együtthatóval megkapom az összes lehetséges sorrendet.

### Input kezelés

Ha nincs stdin (teszteléshez), beépített sample inputot használ. Egyébként soronként olvassa a teszteseteket.
