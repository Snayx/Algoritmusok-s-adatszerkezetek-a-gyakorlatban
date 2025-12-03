# Swap Nodes

A program egy bináris fát épít fel, majd adott mélységeken megcseréli a gyerekeket, és minden csere után kiírja az inorder bejárást.

## Hogyan működik

### A Node interface

```typescript
interface Node {
    val: number;
    left: Node | null;
    right: Node | null;
    depth: number;
}
```

Minden csomópontban tárolom az értéket, a két gyereket és a mélységet. A mélység azért kell, mert a cserék mélység alapján történnek.

### Fa építése BFS-sel

```typescript
const root: Node = { val: 1, left: null, right: null, depth: 1 };
const queue: Node[] = [root];
```

A gyökér mindig 1-es értékű. Utána BFS-sel végigmegyek a csomópontokon, és az `indexes` tömb alapján hozzáadom a gyerekeket. Ha `-1` van, akkor ott nincs gyerek.

### Csere adott mélységen

```typescript
function swapAtDepth(node: Node | null, k: number): void {
    if (node.depth % k === 0) {
        [node.left, node.right] = [node.right, node.left];
    }
    // ...rekurzív hívások
}
```

Végigmegyek a fán, és ahol a mélység osztható k-val, ott megcserélem a bal és jobb gyereket.

### Inorder bejárás

```typescript
function inorder(node: Node | null, result: number[]): void
```

Klasszikus inorder: bal részfa → aktuális csomópont → jobb részfa. Minden query után ezt hívom meg és az eredményt eltárolom.

## Input/Output

A HackerRank boilerplate kezeli az I/O-t, a lényegi rész a `swapNodes` függvény.
