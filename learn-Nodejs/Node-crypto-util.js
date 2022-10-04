// 단방향 암호화(cryto): 암호화는 가능하지만 복호화는 불가능
//      암호화: 평문을 암호로 만듦 => 멀티 스레드
//      복호화: 암호를 평문으로 해독

// 해시 기법: 문자열을 고정된 길이의 다른 문자열로 바꾸는 방식
//      평문을 암호로 만들지만, 암호를 평문으로 만들 수 없음 -> 비밀번호

// createHash(알고리즘): 사용할 해시 알고리즘을 삽입
//      sha256, sha512 등이 사용 가능 => 취약해지면 강화된 알고리즘으로 교체
// .update(문자열): 변환할 문자열을 삽입
// .digest(인코딩): 인코딩할 알고리즘을 삽입
//      base64, hex, latin1이 주로 사용하며, base64가 문자열이 가장 짧음

// pbkdf2: 비밀번호를 암호화하는 알고리즘 중 하나
//      crypto.randomByte를 통해 64 bite 문자열 생성 -> salt 역할

// 양방향 암호화 (대칭형 암호화): 암호문을 복호화 가능
//      암호화할 때는 복호화 할 때와 같이 key를 사용해야 함 => 보안에 취약

// 다른 사람이 만든 crypto.js (AES)를 사용하는 걸 추천
// AWS KMS (Key Management Service)

// 양방향 암호화 메소드
//      crypto.createCiperiv(알고리즘, 키, iv)
//      : 암호화 알고리즘과 키, 초기화벡터 삽입
//          aes-256-cbc 암호화 알고리즘
//          crypto.getCipers() => 사용 가능한 알고리즘 목록 표시
//          키는 32 bite, 초기화벡터(iv)는 16 bite로 고정
//      crypto.update(문자열, 인코딩, 출력 인코딩)
//      : 암호화할 대상과 대상의 인코딩 출력 결과물의 인코딩을 삽입
//          문자열은 utf8 인코딩, 암호는 base64를 많이 사용
//      cipher.final(출력 인코딩): 출력 결과물의 인코딩을 삽입하면 암호화 완료
//      crypto.createDecipheriv(알고리즘, 키, iv)
//      : 복호화 시 사용하며, 암호화할 때 사용한 알고리즘, 키, iv를 삽입해야 함
//      decipher.update(문자열, 인코딩, 출력 인코딩)
//      : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 삽입
//          crypto.update()과 반대로 base64, utf8 순서로 삽입
//      decipher.final(출력 인코딩): 복호화 결과물의 인코딩을 삽입

// util: 각종 편의 기능을 모아둔 모듈
//      .deprecated: 함수가 deprecated 처리되었음을 알려줌
//          첫 번째 인자로 넣은 함수를 사용했을 때 경고 메시지가 출력
//          두 번째 인자로 경고 메시지를 삽입
//          코드를 잘못 만들었다는 걸 알려주기 위한 모듈
//      .promisify: 콜백 패턴을 promise 패턴으로 변경
//          변경할 함수를 인자로 제공 => async/await 패턴까지 사용 가능
//          콜백 함수가 (error, data) => {} 형식이어야 함
