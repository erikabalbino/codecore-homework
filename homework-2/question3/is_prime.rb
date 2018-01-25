def is_prime(n)
  if n > 1
    for i in 2...n
      if (n % i) == 0
         return false
      end
    end
    true
  else
    false
  end
end
